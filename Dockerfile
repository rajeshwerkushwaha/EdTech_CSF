FROM golang:1.10

RUN apt-get update && \
    apt-get install -y apt-utils \
    zip \
    unzip \
    vim \
    curl \
    netcat

WORKDIR /go/src/github.com/PaiAkshay998/EdTech_CSF
ADD . /go/src/github.com/PaiAkshay998/EdTech_CSF
EXPOSE 8000

CMD ["/bin/bash", "docker-entry.sh"]
