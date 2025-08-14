publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	./bin/gendiff.js -h