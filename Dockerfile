FROM node:slim

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
&& apt-get update \
&& apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
--no-install-recommends \
&& rm -rf /var/lib/apt/lists/* \
&& rm -rf /src/*.deb

WORKDIR /home/node

# ADD package.json package-lock.json
# Install app dependencies
COPY package.json .
COPY . .

# Install puppeteer so it's available in the container.
RUN npm i puppeteer babel-core babel-jest babel-preset-env jest jest-image-snapshot \
# Add user so we don't need --no-sandbox.
# same layer as npm install to keep re-chowned files from using up several hundred MBs more space
&& groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
&& mkdir -p /home/pptruser/Downloads \
&& chown -R pptruser:pptruser /home/pptruser \
&& chown -R pptruser:pptruser /app/node_modules

# It doesn't execute unless we set permissions
RUN chmod 0755 /app
# Run everything after as non-privileged user.
USER pptruser

CMD ["npm", "test"]