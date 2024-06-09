dev:
	npm run dev

deploy:
	npm run build
	# deploy to my nginx server
	# syncs the folders, to prevent older versions clogging up space
	# wildcard (*) is bugged to not delete properly
	# which is ideal because resume.pdf is now stored somewhere else
	rsync -a --delete dist/* me:/var/www/html/jinwei.dev -v
