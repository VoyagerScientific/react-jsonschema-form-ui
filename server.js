import { createServer } from 'miragejs';
import _ from 'lodash';

const toDataURI = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  })
}

export default () => {
  let server = createServer({
    routes() {
      this.post('/api/users', async (server, request) => {
        const attachments = request.requestBody.getAll('attachments');
        if (_.isArray(attachments)) {
          const promises = _.map(attachments, async (attachment) => {
            const url = await toDataURI(attachment);
            const filename = attachment.name;
            return { url, filename };
          });
          const responseData = await Promise.all(promises);
          return responseData;
        }
        const dataURI = await toDataURI(attachments);
        return { filename: attachments.name, url: dataURI };
      })
      this.passthrough()
      this.passthrough('https://5fe385bb8bf8af001766e7a1.mockapi.io/**')
      this.passthrough('https://api.airtable.com/**')
      this.passthrough('https://cors-anywhere.herokuapp.com/**')
    }
  })
  return server;
}