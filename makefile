dev:
	npm run develop

deploy:
	npm run build
	# deploy to my nginx server
	scp -r public/* me:/var/www/html/jinwei.dev
