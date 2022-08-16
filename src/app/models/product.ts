export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;

  constructor(id, name, description = '', price = 0, imageUrl ) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    if(imageUrl===''){
      imageUrl = 'https://th.bing.com/th/id/R.08dd330189d256e097f19c9f0f7d6307?rik=iwIh5Peey98btQ&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fassassinscreed%2fimages%2f3%2f39%2fNot-found.jpg%2frevision%2flatest%3fcb%3d20110517171552&ehk=8hqTonUkws%2bimDsJ4D%2bb45Vfe3gG41PXycQQlFy2AIA%3d&risl=&pid=ImgRaw&r=0'
    }
    else{
      this.imageUrl = imageUrl
    }
  }
}
