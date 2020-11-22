const APP_CONFIG = require('./APP_CONFIG');

module.exports = {
  register: {
    title: "Bienvenid@ a StarMyAgent,",
    agent: ({ link }) => `
      <p>Hola,</p>
      <p>Tu prueba gratuita de 30 días comienza hoy una vez completes el registro. Una vez expire el periodo de prueba comenzarás a pagar por mes vencido de acuerdo a los clientes recibidos mensualmente. </p>
      <p>Puedes cancelar en cualquier momento.</p>
      <p>Cualquier duda nos dices.</p>
      <p>Un saludo!</p>
    `,
    agencyAgent: ({ link }) => `
      <p>Hola,</p>
      <p>La agencia para la que trabajas nos ha contratado para incluirte en nuestra plataforma. Accede al siguiente link <a href="${link}">${link}</a> , completa tu perfil y empieza a recibir clientes.</p>
      <p>Cualquier duda nos dices.</p>
      <p>Un saludo!</p>
    `,
    agency: ({link}) => `
      <p>Hola,</p>
      <p>La prueba gratuita de 30 días de tus agentes comienza hoy una vez completes el registro. Asegúrate que completen su perfil rápidamente. Una vez expire el periodo de prueba comenzarás a pagar en por mes vencido de acuerdo a los clientes recibidos mensualmente.</p>
      <p>Puedes cancelar en cualquier momento.</p>
      <p>Cualquier duda nos dices.</p>
      <p>Un saludo!</p>
    `,
    newAgencyUser: body => `
      <p>Ciudad: ${body.city.name}</>
      <p>Nombre y apellidos: ${body.fName} ${body.lName}</p>
      <p>Nombre de agencia: ${body.company.name}</>
      <p>Email: ${body.email}</p>
      <p>Teléfono: ${body.telephone}</p>
    `,
    newAgentUser: body => `
      <p>Ciudad: ${body.city.name}</>
      <p>Nombre y apellidos: ${body.fName} ${body.lName}</p>
      <p>Email: ${body.email}</p>
      <p>Teléfono: ${body.telephone}</p>
    `
  },
  resetPassword: {
    title: "Reset password",
    message: ({ link }) => `Reset link: ${link}`
  },
  contact: {
    title: "Nuevo contacto a través de web",
    message: body => `
      <p>Nombre y apellidos: ${body.fullName}</p>
			<p>Teléfono: ${body.telephone}</p>
			<p>Email: ${body.email}</p>
			<p>Mensaje: ${body.content}</p>
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
    title: "Contacto de cliente propietario",
    oneTime: body => `
      <p>Hola,</p>
      <p>Un cliente propietario te ha seleccionado para que comercialices su propiedad.</p>
      <p>Contáctale lo antes posible. Su mensaje es el siguiente:</p>
      <p>Nombre: ${body.lName}</p>
      <p>Apellido:${body.fName}</p>
      <p>Email: ${body.email}</p>
      <p>Teléfono: ${body.telephone}</p>
      <p>${body.type === 'rent' ? 'Alquiler' : 'Ventas'}</p>
      <p>Dirección exacta del inmueble:: ${body.address}</p>
      <p>Mensaje: ${body.message}</p>
      <p>Un saludo.</p>
      <p>El equipo de StarMyAgent.<br/><small>*Este mensaje es automático. StarMyAgent no filtra los mensajes.</small></p>
    `,
    repeated: body => `
      <p>Hola, Estamos enviando este cliente repetido:</p>
      <p>Un cliente propietario te ha seleccionado para que comercialices su propiedad.</p>
      <p>Contáctale lo antes posible. Su mensaje es el siguiente:</p>
      <p>Nombre: ${body.lName}</p>
      <p>Apellido:${body.fName}</p>
      <p>Email: ${body.email}</p>
      <p>Teléfono: ${body.telephone}</p>
      <p>${body.type === 'rent' ? 'Alquiler' : 'Ventas'}</p>
      <p>Dirección exacta del inmueble:: ${body.address}</p>
      <p>Mensaje: ${body.message}</p>
      <p>Un saludo.</p>
      <p>El equipo de StarMyAgent.<br/><small>*Este mensaje es automático. StarMyAgent no filtra los mensajes.</small></p>
    `
  },
  request: {
    title: "Contacto de cliente buscador",
    message: body => `
      <p>Hola,</p>
      <p>Un cliente buscador te ha seleccionado para que le encuentres un inmueble.</p>
      <p>Ha llegado a ti a través del formulario de contacto por lo que no conoce tus datos.</p>
      <p>Contáctale lo antes posible. Su mensaje es el siguiente:</p>
      <p>Nombre:${body.fName}</p>
      <p>Apellido:${body.lName}</p>
      <p>Email:${body.email}</p>
      <p>Teléfono:${body.budget}</p>
      <p>${body.type === 'rent' ? 'Alquiler' : 'Ventas'}</p>
      <p>Zona o distrito que le interesa:</p>
      <p>Presupuesto máximo:${body.budget}</p>
      <p>Mensaje:<br/>${body.message}</p>
      <p>Un saludo.</p>
      <p>El equipo de StarMyAgent.<br/>
      <small>*Este mensaje es automático. StarMyAgent no filtra los mensajes.</small></p>
		`
  },
  comment: {
    title: 'Confirma tu reseña',
    message: token => `
      <p>Hola, gracias por tu reseña, ya para terminar valídala a través de tu mail. Un saludo</p>
      <a href="${APP_CONFIG.site_url}/review/${token}">Validar reseña</a>
    `
  },
  share : {
    title: 'Mírate este perfil de agente',
    message: link => `
      <p>Hola,</p>
      <p>Échale un vistazo a este agente que te envío ${link}.</p>
      <p>Un saludo !</p>
    `
  },
  verify: {
    title: "Your verify code",
    message: verifyCode => `
      <p>Hola,</p>
      <p>Your code is ${verifyCode}.</p>
      <p>Un saludo !</p>
    `
  },
  registerBasic: {
    title: "Bienvenid@ a StarMyAgent",
    message: `
      <p>Hola,</p>
      <p>Comienza ya a solicitar reseñas a tus clientes favoritos.  Desde tu perfil puedes acceder a todas las características básicas de la plataforma:</p>
      <p>Publicación de perfil en la plataforma</p>
      <p>Links directos a web corporativa y redes sociales</p>
      <p>Reseñas ilimitadas</p>
      <p>Solicitudes de reseña ilimitadas</p>
      <p>Publicación de reseñas en las redes sociales de StarMyAgent</p>
      <p>Cualquier duda estamos a tu disposición en <a href="mailto:info@starmyagent.com">info@starmyagent.com</a></p>
      <p>Un saludo.</p>
    `
  },
  registerAgentPremium: {
    title: "Bienvenid@ a StarMyAgent",
    message: `
      <p>Hola,</p>
      <p>¡Enhorabuena! Eres un agente Premium. Eso significa que además de las básicas desde ya puedes acceder a todas las características Premium para agentes:</p>
      <p>Respuestas a reseñas ilimitadas</p>
      <p>Publica propiedades ilimitadas</p>
      <p>Recibe clientes propietarios y buscadores ilimitados</p>
      <p>Gestiona los clientes desde tu perfil</p>
      <p>Mejor posicionamiento dentro de la plataforma</p>
      <p>Cualquier duda estamos a tu disposición en <a href="mailto:info@starmyagent.com">info@starmyagent.com</a></p>
      <p>Un saludo.</p>
    `
  },
  registerAgencyPremium: {
    title: "Bienvenid@ a StarMyAgent",
    message: `
      <p>Hola,</p>
      <p>¡Enhorabuena! Eres una agencia Premium. Eso significa que además de las básicas desde ya puedes acceder a todas las características Premium para agencias:</p>
      <p>Añade agentes ilimitados x 5.99€ por agente/mes</p>
      <p>Respuestas a reseñas ilimitadas</p>
      <p>Publica propiedades ilimitadas</p>
      <p>Recibe clientes propietarios y buscadores ilimitados</p>
      <p>Mejor posicionamiento dentro de la plataforma</p>
      <p>Cualquier duda estamos a tu disposición en <a href="mailto:info@starmyagent.com">info@starmyagent.com</a></p>
      <p>Un saludo.</p>
    `
  },
  upgradeAgentPremium: {
    title: "Enhorabuena por mejorar tu perfil",
    message: `
      <p>Hola,</p>
      <p>A partir de ahora disfruta de todas las características Premium para agentes:</p>
      <p>Respuestas a reseñas ilimitadas</p>
      <p>Publica propiedades ilimitadas</p>
      <p>Recibe clientes propietarios y buscadores ilimitados</p>
      <p>Gestiona los clientes desde tu perfil</p>
      <p>Mejor posicionamiento dentro de la plataforma</p>
      <p>Cualquier duda estamos a tu disposición en <a href="mailto:info@starmyagent.com">info@starmyagent.com</a></p>
      <p>Un saludo.</p>
    `
  },
  upgradeAgencyPremium: {
    title: "Enhorabuena por mejorar tu perfil",
    message: `
      <p>Hola,</p>
      <p>A partir de ahora disfruta de todas las características Premium para agencias:</p>
      <p>Añade agentes ilimitados x 5.99€ por agente/mes</p>
      <p>Respuestas a reseñas ilimitadas</p>
      <p>Publica propiedades ilimitadas</p>
      <p>Recibe clientes propietarios y buscadores ilimitados</p>
      <p>Mejor posicionamiento dentro de la plataforma</p>
      <p>Cualquier duda estamos a tu disposición en <a href="mailto:info@starmyagent.com">info@starmyagent.com</a></p>
      <p>Un saludo.</p>
    `
  },
};
