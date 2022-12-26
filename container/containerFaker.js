import { faker } from '@faker-js/faker'
faker.locale = 'es'

class ContenedorFaker {

    async getProductosTest() {

        class productosTest {
            constructor(id, title, price, thumbnail) {
                this.id = id;
                this.title = title;
                this.price = price;
                this.thumbnail = thumbnail
            }
        }
        const productosTestArray = []

        for (let i = 0; i < 5; i++) {
            productosTestArray.push(new productosTest(i, faker.commerce.productName(), faker.commerce.price(), faker.image.business()))
        }
        return productosTestArray

    }

}

export default ContenedorFaker;