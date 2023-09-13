install:
	npm ci

install-local:
	npm install

start:
	npm run dev -- --host

build:
	npm run build

preview:
	npm run preview

test:
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

test-watch:
	npx jest --watch

lint:
	npx eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0

clean:
	rm -rf ./node_modules
	rm -rf ./*/*/build
	rm -rf ./*/*/coverage
	rm -rf ./*/*/node_modules

reset: clean install-local

.PHONY: test
