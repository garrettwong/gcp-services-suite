## This Dockerfile allows running the entire application suite in Docker
ARG VERSION=18.04
FROM ubuntu:${VERSION}

ENV DEBIAN_FRONTEND=noninteractive

SHELL ["/bin/bash", "-eo", "pipefail", "-c"]

COPY Dockerfile /

RUN apt-get update -y && apt-get install -y telnet \
    curl \
    wget \
    git \
    zip \
    unzip \
    jq

# Install GCLOUD
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && apt-get install -y gnupg2 \
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - \
    && apt-get update -y && apt-get install google-cloud-sdk -y

RUN useradd -ms /bin/bash admin
USER admin
WORKDIR /home/admin
COPY . .

CMD ["bash"]