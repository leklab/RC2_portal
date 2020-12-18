from elasticsearch import Elasticsearch
import gzip


def connect_elasticsearch():
    es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

    '''
    if es.ping():
        print('Yay Connect')
    else:
        print('Awww it could not connect!')
	'''


    return es


def create_diff_expression_index(es, index_name='diff_expression_test'):
	settings = {
		"settings": {
            "number_of_shards": 1,
            "number_of_replicas": 0
        },
		"mappings": {
			"_doc": {
				"properties": {
					"gene_symbol": { "type": "keyword"},
					"genotype1": { "type": "keyword"},
					"genotype2": { "type": "keyword"},
					"time_point": { "type": "keyword"},					
					"logfc": {"type": "float"},
					"pvalue": {"type": "float"}					
				}
			}
		}
	}

	es.indices.create(index=index_name, body=settings)




def populate_de_data(file, es, index_name='diff_expression_test'):

	de_file = gzip.open(file,'rt')
	de_file.readline()
	header = de_file.readline().strip('\n').split('\t')
	#baseMean	log2FoldChange	lfcSE	stat	pvalue	padj	gene_id	gene_name

	genotype1 = "WT"
	genotype2 = "KO"
	time_point = "W7"


	for line in de_file:
		fields = line.strip('\n').split('\t')

		if fields[7] == "NA":
			continue
		
		record = {
			"gene_symbol": fields[7],
			"genotype1": genotype1,
			"genotype2": genotype2,
			"time_point": time_point,
			"logfc": fields[1],
			"pvalue": fields[4],
		}

		#print(record)		
		es.index(index=index_name, doc_type='_doc', body=record)

if __name__ == '__main__':
	es = connect_elasticsearch()
	create_diff_expression_index(es)
	populate_de_data('/home/ml2529/rna_seq/deseq_gne_example.tsv.gz',es)

	

