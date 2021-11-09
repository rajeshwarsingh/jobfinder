

const env = 'local'
// const env = 'heroku'

let config = {
  baseUrl : 'https://jugaad-mw.herokuapp.com',
  // baseUrl: 'http://localhost:3001',
  baseFrontenUrl : 'https://jugaad-fronten.herokuapp.com',
  // baseFrontenUrl: 'http://localhost:3000',
  baseSocketUrl:'https://jugaad-socket.herokuapp.com',
  // baseSocketUrl: 'http://localhost:4001',
  // xdf
  displayNameSettings: {
    post: 'joblem',
    service: 'Joblot',
    freelancer: 'Jobber',
    hiremanager: 'Jobster',
    hiremgrDashboard: 'Jobboard',
    freelancerDashboard: 'Jobspace',
    admin: ''
  },
  cloudinary: {
    apiKey: '776555942336941',
    apiSecrate: 'cBe5MzwGSofI_vEDbXQxrhhX-m8',
    cloudinaryUrl: 'cloudinary://776555942336941:cBe5MzwGSofI_vEDbXQxrhhX-m8@dkydl3enp',
    cloudName: 'dkydl3enp',
    uploadPreset: 'hhg4asuq',
    apiUrl: 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'
  },
  post: {
    defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
    defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
  },
  service: {
    DisplayName: 'joblot',
    defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
    defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
  },
  user: {
    DisplayName: 'jobber',
    defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
    defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
  },
  createrUser: {
    DisplayName: 'Jobster',
    defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
    defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
  },
  payment: {
    paypal: {
      env: 'sandbox',
      sandbox: {
        // account:'sb-ly86s3290443@business.example.com',
        // clientID: 'AQArmfbyowiBE1xwArOtN8RcC11cocLgnE35N7WMyoiKdTTmV1UCon7xQI9g6v1TGefRrxbX-KtbNj02',
        // secret: 'EK2Ot7G9MsMHlLQIp9Fwhp_-_AhSeVCiWYdvUT7qSGMXmUf9BtTIoO4knQRS1TPJqpeDh0IgN-CVU-GI'
        account: 'sb-l5ijc3260396@business.example.com',
        clientID: 'AVFRF5NV275enN3pTik8DQcAp73hjjVbuIBoqwaOIW1Wf3kZ9OZrPNqxPhqWEvemmbRMD7kP3Q-mv4OQ',
        secret: 'EJpDUzDkTNN_sesmoNCWPnDPrfya6u2lNDQ6WkJ1W4jWN8dmFRNuqUZibeEYQifqnQ1M9k55QJ5aEEvJ'
      },
      live: {
        account: '',
        clientID: '',
        secret: ''
      }
    }
  },
  googleSinin: {
    clientId: '683589841016-6i7bdhe22p7g92t89gjdatrvti09llnq.apps.googleusercontent.com'
  },
  LinkedinSinin: {
    clientId: '78nqdhwy582n42'
  },
  googlemap: {
    key: 'AIzaSyBHPc_xR1Cj-YzUdu5APY0Zo2NK_d5dXR0'
  }

}

if(env === 'local'){
  config = {
    baseUrl: 'http://localhost:3001',
    baseFrontenUrl: 'http://localhost:3000',
    baseSocketUrl: 'http://localhost:4001',
    displayNameSettings: {
      post: 'joblem',
      service: 'Joblot',
      freelancer: 'Jobber',
      hiremanager: 'Jobster',
      hiremgrDashboard: 'Jobboard',
      freelancerDashboard: 'Jobspace',
      admin: ''
    },
    cloudinary: {
      apiKey: '776555942336941',
      apiSecrate: 'cBe5MzwGSofI_vEDbXQxrhhX-m8',
      cloudinaryUrl: 'cloudinary://776555942336941:cBe5MzwGSofI_vEDbXQxrhhX-m8@dkydl3enp',
      cloudName: 'dkydl3enp',
      uploadPreset: 'hhg4asuq',
      apiUrl: 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'
    },
    post: {
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
    },
    service: {
      DisplayName: 'joblot',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
    },
    user: {
      DisplayName: 'jobber',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
    },
    createrUser: {
      DisplayName: 'Jobster',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
    },
    payment: {
      paypal: {
        env: 'sandbox',
        sandbox: {
          // account:'sb-ly86s3290443@business.example.com',
          // clientID: 'AQArmfbyowiBE1xwArOtN8RcC11cocLgnE35N7WMyoiKdTTmV1UCon7xQI9g6v1TGefRrxbX-KtbNj02',
          // secret: 'EK2Ot7G9MsMHlLQIp9Fwhp_-_AhSeVCiWYdvUT7qSGMXmUf9BtTIoO4knQRS1TPJqpeDh0IgN-CVU-GI'
          account: 'sb-l5ijc3260396@business.example.com',
          clientID: 'AVFRF5NV275enN3pTik8DQcAp73hjjVbuIBoqwaOIW1Wf3kZ9OZrPNqxPhqWEvemmbRMD7kP3Q-mv4OQ',
          secret: 'EJpDUzDkTNN_sesmoNCWPnDPrfya6u2lNDQ6WkJ1W4jWN8dmFRNuqUZibeEYQifqnQ1M9k55QJ5aEEvJ'
        },
        live: {
          account: '',
          clientID: '',
          secret: ''
        }
      }
    },
    googleSinin: {
      clientId: '683589841016-6i7bdhe22p7g92t89gjdatrvti09llnq.apps.googleusercontent.com'
    },
    LinkedinSinin: {
      clientId: '78nqdhwy582n42'
    },
    googlemap: {
      key: 'AIzaSyBHPc_xR1Cj-YzUdu5APY0Zo2NK_d5dXR0'
    }
  
  } 
}

if(env === 'heroku'){
  config = {
    baseUrl : 'https://jugaad-mw.herokuapp.com',
    baseFrontenUrl : 'https://jugaad-fronten.herokuapp.com',
    baseSocketUrl:'https://jugaad-socket.herokuapp.com',
    displayNameSettings: {
      post: 'joblem',
      service: 'Joblot',
      freelancer: 'Jobber',
      hiremanager: 'Jobster',
      hiremgrDashboard: 'Jobboard',
      freelancerDashboard: 'Jobspace',
      admin: ''
    },
    cloudinary: {
      apiKey: '776555942336941',
      apiSecrate: 'cBe5MzwGSofI_vEDbXQxrhhX-m8',
      cloudinaryUrl: 'cloudinary://776555942336941:cBe5MzwGSofI_vEDbXQxrhhX-m8@dkydl3enp',
      cloudName: 'dkydl3enp',
      uploadPreset: 'hhg4asuq',
      apiUrl: 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'
    },
    post: {
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
    },
    service: {
      DisplayName: 'joblot',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
    },
    user: {
      DisplayName: 'jobber',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
    },
    createrUser: {
      DisplayName: 'Jobster',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
    },
    payment: {
      paypal: {
        env: 'sandbox',
        sandbox: {
          // account:'sb-ly86s3290443@business.example.com',
          // clientID: 'AQArmfbyowiBE1xwArOtN8RcC11cocLgnE35N7WMyoiKdTTmV1UCon7xQI9g6v1TGefRrxbX-KtbNj02',
          // secret: 'EK2Ot7G9MsMHlLQIp9Fwhp_-_AhSeVCiWYdvUT7qSGMXmUf9BtTIoO4knQRS1TPJqpeDh0IgN-CVU-GI'
          account: 'sb-l5ijc3260396@business.example.com',
          clientID: 'AVFRF5NV275enN3pTik8DQcAp73hjjVbuIBoqwaOIW1Wf3kZ9OZrPNqxPhqWEvemmbRMD7kP3Q-mv4OQ',
          secret: 'EJpDUzDkTNN_sesmoNCWPnDPrfya6u2lNDQ6WkJ1W4jWN8dmFRNuqUZibeEYQifqnQ1M9k55QJ5aEEvJ'
        },
        live: {
          account: '',
          clientID: '',
          secret: ''
        }
      }
    },
    googleSinin: {
      clientId: '683589841016-6i7bdhe22p7g92t89gjdatrvti09llnq.apps.googleusercontent.com'
    },
    LinkedinSinin: {
      clientId: '78nqdhwy582n42'
    },
    googlemap: {
      key: 'AIzaSyBHPc_xR1Cj-YzUdu5APY0Zo2NK_d5dXR0'
    }
  
  } 
}

if(env === 'prod'){
  config = {
    baseUrl : 'https://jugaad-mw.herokuapp.com',
    // baseUrl: 'http://localhost:3001',
    baseFrontenUrl : 'https://jugaad-fronten.herokuapp.com',
    // baseFrontenUrl: 'http://localhost:3000',
    baseSocketUrl:'https://jugaad-socket.herokuapp.com',
    // baseSocketUrl: 'http://localhost:4001',
    // xdf
    displayNameSettings: {
      post: 'joblem',
      service: 'Joblot',
      freelancer: 'Jobber',
      hiremanager: 'Jobster',
      hiremgrDashboard: 'Jobboard',
      freelancerDashboard: 'Jobspace',
      admin: ''
    },
    cloudinary: {
      apiKey: '776555942336941',
      apiSecrate: 'cBe5MzwGSofI_vEDbXQxrhhX-m8',
      cloudinaryUrl: 'cloudinary://776555942336941:cBe5MzwGSofI_vEDbXQxrhhX-m8@dkydl3enp',
      cloudName: 'dkydl3enp',
      uploadPreset: 'hhg4asuq',
      apiUrl: 'https://api.cloudinary.com/v1_1/dkydl3enp/upload'
    },
    post: {
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
    },
    service: {
      DisplayName: 'joblot',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/pos-thumbnail_tnhnjd.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1603301373/jugaad/post/default/post-background_wd2tbh.jpg'
    },
    user: {
      DisplayName: 'jobber',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
    },
    createrUser: {
      DisplayName: 'Jobster',
      defaultLogo: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606045733/jugaad/user/default/user-avatar-small-01_vr8llv.jpg',
      defaultBg: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1606046045/jugaad/user/default/single-task_sd4mqo.jpg'
    },
    payment: {
      paypal: {
        env: 'sandbox',
        sandbox: {
          // account:'sb-ly86s3290443@business.example.com',
          // clientID: 'AQArmfbyowiBE1xwArOtN8RcC11cocLgnE35N7WMyoiKdTTmV1UCon7xQI9g6v1TGefRrxbX-KtbNj02',
          // secret: 'EK2Ot7G9MsMHlLQIp9Fwhp_-_AhSeVCiWYdvUT7qSGMXmUf9BtTIoO4knQRS1TPJqpeDh0IgN-CVU-GI'
          account: 'sb-l5ijc3260396@business.example.com',
          clientID: 'AVFRF5NV275enN3pTik8DQcAp73hjjVbuIBoqwaOIW1Wf3kZ9OZrPNqxPhqWEvemmbRMD7kP3Q-mv4OQ',
          secret: 'EJpDUzDkTNN_sesmoNCWPnDPrfya6u2lNDQ6WkJ1W4jWN8dmFRNuqUZibeEYQifqnQ1M9k55QJ5aEEvJ'
        },
        live: {
          account: '',
          clientID: '',
          secret: ''
        }
      }
    },
    googleSinin: {
      clientId: '683589841016-6i7bdhe22p7g92t89gjdatrvti09llnq.apps.googleusercontent.com'
    },
    LinkedinSinin: {
      clientId: '78nqdhwy582n42'
    },
    googlemap: {
      key: 'AIzaSyBHPc_xR1Cj-YzUdu5APY0Zo2NK_d5dXR0'
    }
  
  } 
}

export default config