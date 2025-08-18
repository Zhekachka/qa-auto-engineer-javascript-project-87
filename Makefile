publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	./bin/gendiff.js -h

file-parse:
	node ./bin/gendiff.js file1.json file2.json

test-watch:
	npm run test:watch

test-coverage:
	npm test -- --coverage

install: deps-install
	npx simple-git-hooks