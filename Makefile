publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	./bin/gendiff.js -h

file-parse:
	node ./bin/gendiff.js file1.json file2.json