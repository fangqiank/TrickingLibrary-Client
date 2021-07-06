import https from 'https'

const agent= ()=>{
  return new https.Agent({
    rejectUnauthorized: false
  })
}

export default agent
