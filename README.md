# Flickr Maps

## Flickr Permissions
To run any part of this application, you'll need to specify both a `FLICKR_KEY` and `FLICKR_SECRET` as environment variables. You'll need to visit flickr's developer pages and create a test app to obtain these keys.

## Populating a database
To get a copy of flickr's interesting photos, start a local instance of redis and run `make database`. This job quickly polls flickr by date beginning with the first day in it's history (Feb 1, 2004) and ending with yesterday (the last date an interesting photo was recorded). Due to polling restrictions, it's possible that this job will fail part way through, skip steps, or you could get bored and force quit it. In any of those scenarios, run `make database` again to start where you left off.