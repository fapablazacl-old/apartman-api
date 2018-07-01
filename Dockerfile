FROM node:latest

# configurar el directorio de trabajo
WORKDIR /app

# agregar todos los archivos del directorio actual
ADD . /app

# instalar y cachear las dependencias
RUN npm install

# agregar el siguiente directorio al PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# iniciar la aplicacion
EXPOSE 8000
CMD ["npm", "start"]
