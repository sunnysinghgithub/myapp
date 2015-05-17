import zerorpc
import sys
import nltk
import logging
from nltk.tag import pos_tag
from nltk.help import upenn_tagset
from nltk.tokenize import word_tokenize

root = logging.getLogger()
root.setLevel(logging.DEBUG)

ch = logging.StreamHandler(sys.stdout)
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
root.addHandler(ch)

class HelloRPC(object):
    def hello(self, sentence):    	
    	tokenized_sentence = word_tokenize(sentence)
	tagged_sent = pos_tag(tokenized_sentence)

	interest_types = ["NN","NNP","NNS","VBG","VB"]

	extracted = []

	for tagged in tagged_sent:
	    word_type = tagged[1]
	    if word_type in interest_types:
	        if tagged[0] not in extracted:
	            extracted.append(tagged[0])

	importantwords = ', '.join(extracted)
		
        return "Hello, %s" % importantwords

s = zerorpc.Server(HelloRPC())
s.bind("tcp://0.0.0.0:5000")
s.run()