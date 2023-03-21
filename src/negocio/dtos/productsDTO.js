export class ProductDto {
    constructor({ _id, title, price, thumbnail }) {
        this.id = _id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }
}