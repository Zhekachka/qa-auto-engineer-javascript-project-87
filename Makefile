publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	./bin/gendiff.js -h

file-parse-json:
	node ./bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

file-parse-yml:
	node ./bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml

test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm test -- --coverage

install:
	npm ci