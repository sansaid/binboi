FROM golang:1.18

WORKDIR /code

COPY . .

RUN go mod download && \
    go mod verify && \
    mkdir /build && \
    go build -v -o /build/server ./...

ENTRYPOINT [ "/build/server" ]