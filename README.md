# sbergile

## Project setup (development)
```
npm install
npm run dev
```

## Project setup (production)

To simplify project deployment, Docker is used. 

Build an image: 

```
docker build . -t sbergile
```

Run project: 

```
docker run -p 443:3000 -v $(pwd)/data:/app/data -v $(pwd)/cert:/app/cert sbergile
```

Please make sure you have generated and installed ssl certificates (see below).

## Certificates

Certificates are used to provide secured server-client connection.

### Certificate generation

OpenSSL is used to generate CA, Server and Client keys and certificates.

Certificate generation config sample is provided in _cert/ssl.conf_, please review and edit it as neded; make sure you have set correct Common Name (CN) and Subject Alternative Names (alt_names section).


#### CA
```
openssl genrsa -out ca.key 2048
openssl req -new -sha256 -x509 -days 1095 -key ca.key -out ca.crt
```

#### Server
```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -sha256 -out server.csr -config ssl.cnf
openssl x509 -req -days 1095 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 0x`openssl rand 16 -hex` -sha256 -out server.pem -extfile ssl.cnf -extensions v3_req
```

#### Client 
```
openssl genrsa -out client.key 2048
openssl req -new -key client.key -sha256 -out client.csr
openssl x509 -req -days 1095 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 0x`openssl rand 16 -hex` -sha256 -out client.pem
```

On the last step you have to export client certificate in portable p12 format; you will be asked to set up an export password for it.

```
openssl pkcs12 -export -in client.pem -inkey client.key -name "DEMO ACCESS" -out client.p12
```

### Certificate installation

You must place files _server.key_, _server.pem_ and _ca.crt_ in _cert_ directory on the server side and install _ca.crt_ and _client.p12_ to the client device (see below).

#### Windows

Select "Contol Panel" > "Internet options" > "Content" > "Certificates" 
![win0](https://vgolovnin.me/sa-static/win0.png)

Use an "Import" button on the "Trusted root certificates" tab to open "Certificate import wizard"
![win1](https://vgolovnin.me/sa-static/win1.png)

Select _ca.crt_ in "Open file" dialog
![win2](https://vgolovnin.me/sa-static/win2.png)

Press "Next" > "Next" and accept the security warning.
![win3](https://vgolovnin.me/sa-static/win3.png)
![win4](https://vgolovnin.me/sa-static/win4.png)

Use an "Import" button on the "Personal" tab  to open "Certificate import wizard"
![win5](https://vgolovnin.me/sa-static/win5.png)

Select _client.p12_ in "Open file" dialog
![win6](https://vgolovnin.me/sa-static/win6.png)

Enter the password for _client.p12_
![win7](https://vgolovnin.me/sa-static/win7.png)

Press "Next" > "Next"
![win8](https://vgolovnin.me/sa-static/win8.png)

#### macOS

Open "Applications" > "Utilities" > "Keychain Access" and select "File" > "Import items" menu action.

![mac0](https://vgolovnin.me/sa-static/mac0.png)

Select _ca.crt_ in "Open file" dialog

![mac1](https://vgolovnin.me/sa-static/mac1.png)

Double-click on imported certificate and set up preference "Trust" > "When using this certificate" > "Always trust"
![mac2](https://vgolovnin.me/sa-static/mac2.png)

Use "File" > "Import items" again and select _client.p12_ in "Open file" dialog"
![mac3](https://vgolovnin.me/sa-static/mac3.png)

Enter the password for _client.p12_
![mac4](https://vgolovnin.me/sa-static/mac4.png)
