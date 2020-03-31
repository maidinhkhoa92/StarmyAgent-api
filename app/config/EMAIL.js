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
  newAgency: {
    title: "New agency contacted",
    message: body => `
      City: ${body.city}
      Name of manager: ${body.managerName}
      Agency name: ${body.agencyName}
      Amounts of agents: ${body.amount}
      Telephone: ${body.telephone}
      Email: ${body.email}
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
