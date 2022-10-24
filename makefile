dev:
	npm run develop

deploy:
	npm run build
	# deploy to my nginx server
	# syncs the folders, to prevent older versions clogging up space
	rsync -a --delete public/* me:/var/www/html/jinwei.dev -v
