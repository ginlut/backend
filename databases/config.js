module.exports = {

  firebase: {
  type: "service_account",
  project_id: "backend-c865e",
  private_key_id: "307460c22e601044597a3485e3ec1e8f85c94e7f",
  private_key: 
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtlURgkyzmFFlJ\n5WRcLdW1x+UtkVUUTuzznzMD8MpfJ6GykiS6Im5BYfEGxGgglXn1qVSgGQnlQjTE\nFvdXyh57Qx4AM9xLNvplIF6Swj4larrq2DUnKmmXqZUg7s0vIj8vknd95LGZF/4H\n7N8ZFoNxLqFh46konflH7yUnm7u8SDEmXGKZvwTIvYW+1akT/eoFiypf1qWq+jxD\nNRzFE7/WfOL7PWk6Cyyx4AZTM+Myv+d2naXuNIWmJYxcWIeQL8itvtv9q4zaFWrc\nUPhGvpGBiMkhRqc73hZvuPj7n1W0W/YeaQ8liptMCAW5Wtj2fZPUnwVwKBC8wXdM\nsVyiRqENAgMBAAECggEAHkIGyU7eZLznU5pJBEh5GFbf/DF5QzD+3PjDS8yNekjO\nRvJytH+L+Jm6ChPykrt7pvb9aWrz7qK7z/Kw6vywk4v/jsl7fSD4ROh/k9WIP717\nF7TYjxs1jNpixHrcCXtOyFwfuDJFQwqLnZYMzbK+9tvKBeZJdmsTKRbmwyDCeO9S\nVk2oX1UcqgnlhmS7i6fGCXqbQFyCg5O5BSow34dc6IJDTZeX+fvTvHvQIWlDYkkM\n08VN5RL480yNbdW9+9kIbcl2DkYz+xQJ0qt6+MH0MhQrCvvBA569XY5DO1drwQsE\n7dMA505d7bJ4NyOaBsP/VzNmfjt3wGgzbYUkbecVgQKBgQD0W/2gp0VWwTe2LlbN\n+4b82t0lOlDZ1deRkcowDrQza7929FOpJ74ldJYe3+9Gus+QtyfS+dTMkUMbiTPi\nkhAh0FUSJysKbhc/M0Mx6iY5gWdC+XKrtmDe7elEryyH02RMrCUSBEav+ZjX2Vgg\nMcr7CK3tkFR2JcP75enyh9qOKwKBgQC12iVrmwwOI1eRh6ke2gDtf0gWeCwYjxRm\nuqr3981XtsULlQK5OUwA9TtHmiOEi70WSAR8q+3AHKYwaakKbMGeG2Yd7Bkyy+cd\nKxYS/rnBrjIU3/eRaBgV4xMXwiunUzDlH/s7pN35wH+KKfbdG4JqSynLd84XdJIx\nDgbVPU0ppwKBgCn2Ggmab8fECkMYlgNtK/MDynH4H6YomIoA1Q2HmN4zpH9S2YL0\ntixMZvMKVVZ6AebB7O7HxAkU8McrumMv3eFQmysw2q1B1nAd524M3V+GnyrbFxvx\nh5UAmcwXoLf6TwDzlrIPVewmGl8GjaGJq2eMSAHBhR98wLji9FeXiKpdAoGBALMa\nMLS0NcFO6ZX5SIWMLFG8hCEtJjDh6jPrMSubsW/sIFFx5wbJ+aMP49x3YPfQMODa\n+SBYrIYDMWKJDeWoi2DOl1ptB7xRukOuBcWbfxPUHpsUol1haidUR5+kqx3W/1cK\nkoOBsuWhw3suLWZDC8ToVjeAvUe4lasep3gpMfANAoGALnu9OkJhxS8yB/B3ba6S\nq4ClXh0cgdPRhnBbhNA4Ria1Ho/CGuyAKJ36yVKEgClrEFb/JUUpp+eeN0T7iH3D\nGm7rM2EmWrFEedoysA+tPUJNkB060M3XVH6ih4k/hqvRRYt2x28B1VliB/s3+BXU\nQDn2He8hbLAtWFSXI2ZOmOs=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-vg5u3@backend-c865e.iam.gserviceaccount.com",
  client_id: "105431408840361841261",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vg5u3%40backend-c865e.iam.gserviceaccount.com"
},
mongodbProducts: {
  connectionString: "mongodb://localhost:27017/productos",
},
mongodbUsers: {
  connectionString: "mongodb://localhost:27017/usuarios",
},
puerto: process.env.PUERTO || 8081,
}
