# Add License Headers 

Update Apache-2.0 headers on all files.  Adds default shebang code headers to all files in the current directory.

## Getting Started

There are 2 options, run node locally or run via a Docker Container.

### Locally

```bash
./run.sh
```

### Docker

```bash
container="headerauto"

docker build -f Dockerfile . -t $container
docker run --rm -v $(pwd)/:/usr/src/app/ $container bash /usr/src/app/run.sh
```
