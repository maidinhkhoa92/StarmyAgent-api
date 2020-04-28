module.exports.result = (req, res) => {
  const { operationType, area, propertyState, furnitureState, lift, sunLight, terrace, terraceArea, commonSpaces } = req.body;
  let price = 0;
  price = price * AreaValue(area)
  price = price * PropertyStateValue(propertyState, operationType)
  price = price * FurnitureValue(furnished, furnitureState, operationType)
  price = price * PropertyFloorNumberValue(lift, propertyFloorNumber)
  price = price * SunLightValue(sunLight)
  price = price * TerraceValue(terrace, terraceArea)
  price = price * CommonSpacesValue(commonSpaces)

  res.status(200).send({ value: price })
}

const AreaValue = number => {
  const parseValue = Number(number)
  const value = parseValue < 60 ? 1.06 : parseValue < 140 ? 1 : 0.94;
  return parseValue * value;
}

const PropertyStateValue = (propertyState, operationType) => {
  let value = 1;
  if (operationType === 'rent') {
    switch (propertyState) {
      case 'Muy malo':
        value = 0.93;
        break;
      case 'Malo':
        value = 0.96;
        break;
      case 'Bueno':
        value = 1.04;
        break;
      case 'Excelente':
        value = 1.07;
        break;
    }
  } else {
    switch (propertyState) {
      case 'Muy malo':
        value = 0.88;
        break;
      case 'Malo':
        value = 0.95;
        break;
      case 'Bueno':
        value = 1.04;
        break;
      case 'Excelente':
        value = 1.06;
        break;
    }
  }

  return value;
}

const FurnitureValue = (furniture, furnitureState, operationType) => {
  let value = 1;

  if (furniture) {
    if (operationType === 'rent') {
      switch (furnitureState) {
        case 'Malo':
          value = 0.96;
          break;
        case 'Bueno':
          value = 1.03;
          break;
        case 'Excelente':
          value = 1.05;
          break;
      }
    } else {
      switch (furnitureState) {
        case 'Malo':
          value = 0.98;
          break;
        case 'Bueno':
          value = 1.02;
          break;
        case 'Excelente':
          value = 1.05;
          break;
      }
    }
  } else {
    if (operationType === 'rent') {
      value = 0.94;
    } else {
      value = 0.97;
    }
  }

  return value;
}

const PropertyFloorNumberValue = (liftControl, floorNumber) => {
  let value = 1;
  switch (floorNumber) {
    case 'Planta baja':
      value = 0.97;
      break;
    case 'Primera o Segunda':
      value = liftControl === 'true' ? 1.04 : 0.97;
      break;
    case 'Tercera planta o superior':
      value = liftControl === 'true' ? 1.04 : 0.93;
      break;
  }

  return value;
}

const SunLightValue = (sunLight) => {
  let value = 1;
  switch (sunLight) {
    case 'Muy Oscuro':
      value = 0.95;
      break;
    case 'Oscuro':
      value = 0.975;
      break;
    case 'Luminoso':
      value = 1.025;
      break;
    case 'Muy Luminoso':
      value = 1.05;
      break;
  }

  return value;
}

const TerraceValue = (terrace, terraceArea) => {
  const parseValue = Number(terraceArea)
  let value = 1;
  if (terrace === 'true') {
    value =
      parseValue < 16
        ? 1.03
        : parseValue < 46
          ? 1.05
          : 1.04;
  }

  return value;
}

const CommonSpacesValue = (commonSpaces) => {
  return commonSpaces === 'true' ? 1.03 : 1;
}