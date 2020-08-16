export default function mapObjectToObject(one, two) {
    for (let property in one) {
        if (property in two || property.startsWith('_')) two[property] = one[property]
    }
    return two
}