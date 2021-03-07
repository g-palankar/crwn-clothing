import React from 'react';
import SHOP_DATA from './shop.data'
import CollectionPreview from '../../components/preview-collection/collection-preview.component'

class ShopPage extends React.Component {
    constructor() {
        super();
        this.state = {
            collection: SHOP_DATA
        }
    }

    render() {
        let { collection } = this.state;
        return (<div className="shop-page">
            {
                collection.map((coll) => (<CollectionPreview key={coll.id} title={coll.title} items={coll.items.filter((c, i) => i < 4)}></CollectionPreview>))
            }
        </div>)
    }
}

export default ShopPage;