# CA

openssl genrsa -out ca.key 2048
openssl req -new -sha256 -x509 -days 1095 -key ca.key -out ca.crt

# SERVER

openssl genrsa -out server.key 2048
openssl req -new -key server.key -sha256 -out server.csr -config ssl.cnf
openssl x509 -req -days 1095 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 0x`openssl rand 16 -hex` -sha256 -out server.pem -extfile ssl.cnf -extensions v3_req


# CLIENT

openssl genrsa -out client.key 2048
openssl req -new -key client.key -sha256 -out client.csr
openssl x509 -req -days 1095 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 0x`openssl rand 16 -hex` -sha256 -out client.pem
openssl pkcs12 -export -in client.pem -inkey client.key -name "DEMO ACCESS" -out client.p12
