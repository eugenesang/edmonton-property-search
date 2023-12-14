# Edmonton Property Search

Search enginge with auto suggest and auto complete capabilities. 

### Tools
1. NodeJS
2. Express JS
3. MongoDB
4. Sockect.io

### Necesary knowledge
1. HTML
2. JSON
3. HTTP (JavaScript connection - fetch)
4. Web sockets

## N/B
The file `properties.json` is referenced multiple times but it is not available because at the time of initial commit it was too large and I didnt want to spend alot of time in uploading it.

The Jupiter Notebook file is used to convert from `JSON` to `CSV`, that's what I uploaded. You can find a way to convert the `CSV` to `JSON`.

The `upload.js` module is used to upload the file to the database. I used `JSONStream` whit `fs.readStream` because it kept blowing my memory when I did it in one go.
