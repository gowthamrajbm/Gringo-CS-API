module.exports = {
  logging: true,
  seed: false,
  db: {
    url: 'mongodb://localhost/gringo'
  },
	media: {
		upload: {
			to: 's3', // or 'local-fs'
			s3: {
				bucket: '',
				secretAccessKey: '',
				accessKeyId: '',
				region: 'ap-south-1',
				accessUrl: ''
			},
			local: {
				path: '/home/abhi/bucket/gringo/uploads',
				accessPath: '/uploads'
			}
		}
	}
}
