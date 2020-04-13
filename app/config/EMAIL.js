module.exports = {
  register: {
    title: "Your new account",
    message: ({ link }) => `Your link: ${link}`
  },
  resetPassword: {
    title: "Reset password",
    message: ({ link }) => `Reset link: ${link}`
  },
  contact: {
    title: "New user contacted",
    message: body => `
			Fullname: ${body.fullName}
			Telephone: ${body.telephone}
			Email: ${body.email}
			Content: ${body.content}
		`
  },
  offer: {
    title: "New Offer",
    oneTime: body => `
            Full Name: ${body.lName} ${body.fName},
            Email: ${body.email},
            Phone: ${body.telephone},
            Type: ${body.type},
            Address: ${body.address},
            Message: ${body.message},
        `,
    repeated: body => `
            We are sending this client repeated :
            Full Name: ${body.lName} ${body.fName},
            Email: ${body.email},
            Phone: ${body.telephone},
            Type: ${body.type},
            Address: ${body.address},
            Message: ${body.message},
        `
  }
};
