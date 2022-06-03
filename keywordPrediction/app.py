from flask import Flask, request
import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
import nltk as nlp
import re
from scipy.sparse import coo_matrix
import nltk
from flask import send_file
from nltk.corpus import stopwords
from wordcloud import WordCloud, STOPWORDS
from nltk.corpus import stopwords
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import itertools
import os
import json
from os import access
from typing import Any, Dict, Optional, Sequence
import jwt
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
import requests



app = Flask(__name__)

username = ''


@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    # jsonData = request.data
    # print(jsonData)
    return "Hello World!"


@app.route('/data', methods=['GET', 'POST'])
def testd():
    jsonData = request.args.get('text')
    print(jsonData)
    test = getkeywords(jsonData)
    return test


@app.route('/keywords', methods=['GET', 'POST'])
def keywordsApi():
    jsondata = request.args.get('text')
    global username
    username = ''
    username = request.args.get('user')
    print(jsondata)
    print("Username " + username)
    test = getkeywords(jsondata)
    return test

@app.route('/keywordsPost', methods=['POST'])
def keywordsApiPost():
    req=request.get_json()
    print(req["text"])
    text=req["text"]
    global username
    username = ''
    username = req["user"]
    print(req)
    print("Username " + username)
    test = getkeywords(str(text))
    return test


@app.route('/keywordsPostNew', methods=['POST'])
def keywordsApiPostNew():
    req=request.get_json()
    token=(request.headers)['Authorization']
    token=token.replace('Bearer ','')
    try:
        get_kid(token)
    except:
        raise Exception("InvalidToken")
    text=req["text"]
    global username
    username = ''
    username = req["user"]
    max_ngram= req["max"]
    min_ngram= req["min"]
    stop_words = "english"
    n_gram_range=(int(min_ngram),int(max_ngram))
    count = CountVectorizer(ngram_range=n_gram_range, stop_words=stop_words).fit([text])
    candidates = count.get_feature_names_out()
    model = SentenceTransformer('distilbert-base-nli-mean-tokens')
    doc_embedding = model.encode([text])
    candidate_embeddings = model.encode(candidates)
    top_n = req["topn"]
    distances = cosine_similarity(doc_embedding, candidate_embeddings)
    #print(req)
    #print("Username " + username)
    test = mmr(doc_embedding, candidate_embeddings,distances, candidates, top_n, diversity=0.7)
    #print(test)
    fileEnglish = "contents/english.txt"
    filewords = open(fileEnglish, 'r', encoding="utf8")
    newStopWords = filewords.read()
    newStopWordsList = set(newStopWords.splitlines())
    word_cloud = WordCloud(
                          background_color='white',
                          stopwords=newStopWordsList,
                          max_words=100,
                          max_font_size=50, 
                          random_state=42
                         ).generate(text)
    fname = username + "_word.png"
    fig = plt.figure(1)
    plt.imshow(word_cloud)
    plt.axis('off')
    #plt.show()
    fig.savefig(fname, dpi=900)
    #return str(test)
    return(json.dumps(test))

@app.route('/get_image')
def get_image():
    filename = username + "_word.png"
    return send_file(filename, mimetype='image/gif')


@app.route('/getimageuser')
def get_imageuser():
    username = request.args.get("user")
    print(username)
    filename = username + "_word.png"
    return send_file(filename, mimetype='image/gif')


def getkeywords(text):
    nltk.download('omw-1.4')
    # print("in function")
    text = re.sub("(\W)", " ", text)
    tokenizer = nlp.WordPunctTokenizer()
    word_count = len(tokenizer.tokenize(text))
    # print(word_count)
    freq = pd.Series(text.split()).value_counts()
    # print(freq.head(10))
    # print(freq.tail(10))
    # print(len(freq))
    fileEnglish = "contents/stop_words_english.txt"
    filewords = open(fileEnglish, 'r', encoding="utf8")
    newStopWords = filewords.read()
    newStopWordsList = set(newStopWords.splitlines())
    # print(len(newStopWordsList))
    # print('said' in newStopWordsList)
    nltk.download('wordnet')
    lemma = nlp.WordNetLemmatizer()
    text = lemma.lemmatize(text)
    text = text.lower()
    nltk.download('stopwords')
    stopword_list = set(stopwords.words("english"))
    # print(stopword_list)
    stopword_list = newStopWordsList
    # print('said' in stopword_list)
    # print(len(stopword_list))
    word_cloud = WordCloud(
        background_color='white',
        stopwords=stopword_list,
        max_words=100,
        max_font_size=50,
        random_state=42
    ).generate(text)
    # print(word_cloud)
    fig = plt.figure(1)
    plt.imshow(word_cloud)
    plt.axis('off')
    # plt.show()
    fname = username + "_word.png"
    fig.savefig(fname, dpi=900)
    data = [[text]]
    df = pd.DataFrame(data, columns=['article_txt'])
    tf_idf = TfidfVectorizer(max_df=1, stop_words=stopword_list, max_features=10000, ngram_range=(1, 3))
    # Learn vocabulary and idf from training set.
    tf_idf.fit(df.article_txt)
    doc = pd.Series(text)
    # Transform documents to document-term matrix.
    doc_vector = tf_idf.transform(doc)
    sorted_items = sort_coo(doc_vector.tocoo())
    # extract only the top n; n here is 10
    feature_names = tf_idf.get_feature_names()
    keywords = extract_topn_from_vector(feature_names, sorted_items, 10)
    return keywords
    # print("Keywords:")
    # for k in keywords:
    #     print(k, keywords[k])


def sort_coo(coo_matrix):
    tuples = zip(coo_matrix.col, coo_matrix.data)
    return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)


def extract_topn_from_vector(feature_names, sorted_items, topn=10):
    """get the feature names and tf-idf score of top n items"""

    # use only topn items from vector
    sorted_items = sorted_items[:topn]
    score_vals = []
    feature_vals = []

    # word index and corresponding tf-idf score
    for idx, score in sorted_items:
        # keep track of feature name and its corresponding score
        score_vals.append(round(score, 3))
        feature_vals.append(feature_names[idx])

    # create a tuples of feature,score
    # results = zip(feature_vals,score_vals)
    results = {}
    for idx in range(len(feature_vals)):
        results[feature_vals[idx]] = score_vals[idx]

    return results

def mmr(doc_embedding, word_embeddings,distances, words, top_n, diversity):

    # Extract similarity within words, and between words and the document
    word_doc_similarity = cosine_similarity(word_embeddings, doc_embedding)
    word_similarity = cosine_similarity(word_embeddings)

    # Initialize candidates and already choose best keyword/keyphras
    keywords_idx = [np.argmax(word_doc_similarity)]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    for _ in range(top_n - 1):
        # Extract similarities within candidates and
        # between candidates and selected keywords/phrases
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        # Calculate MMR
        mmr = (1-diversity) * candidate_similarities - diversity * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # Update keywords & candidates
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    # print(keywords_idx)
    return [(words[idx],round(float(distances[0][idx]), 4)) for idx in keywords_idx]

def get_kid(token: str) -> Optional[str] :
    """
    Extracts a kid (key id) from a JWT.
    """
    token_header  = jwt.get_unverified_header(token)
    res = requests.get('https://login.microsoftonline.com/common/.well-known/openid-configuration')
    jwk_uri = res.json()['jwks_uri']
    res = requests.get(jwk_uri)
    jwk_keys = res.json()
    x5c = None

# Iterate JWK keys and extract matching x5c chain
    for key in jwk_keys['keys']:
        if key['kid'] == token_header['kid']:
            x5c = key['x5c']
    cert = ''.join([
    '-----BEGIN CERTIFICATE-----\n',
    x5c[0],
    '\n-----END CERTIFICATE-----\n',
    ])  
    public_key =  load_pem_x509_certificate(cert.encode(), default_backend()).public_key()
    app_id="a7097b14-b1de-4ef1-af47-45d62b0f9667"
    t=jwt.decode(
    token,
    public_key,
    algorithms='RS256',
    audience=app_id,)
    return token_header.get("kid")


if __name__ == '__main__':
    app.run()
    #app.run(host='0.0.0.0', port=105)
