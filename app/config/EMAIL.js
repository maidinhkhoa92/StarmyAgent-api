module.exports = {
    offer: {
        title: 'New Offer',
        oneTime: body => (`
            Full Name: ${body.lName} ${body.fName},
            Email: ${body.email},
            Phone: ${body.telephone},
            Type: ${body.type},
            Address: ${body.address},
            Message: ${body.message},
        `),
        repeated: body => (`
            We are sending this client repeated :
            Full Name: ${body.lName} ${body.fName},
            Email: ${body.email},
            Phone: ${body.telephone},
            Type: ${body.type},
            Address: ${body.address},
            Message: ${body.message},
        `)
    }
  };
  