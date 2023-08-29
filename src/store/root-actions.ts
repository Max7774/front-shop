import { carouselSlice } from './carousel/carousel.slice'
import { cartSlice } from './cart/cart.slice'
import { filtersSlice } from './filters/filters.slice'
import * as ProductActions from './product/products.actions'
import { productSlice } from './product/products.slice'
import * as userActions from './user/user.actions'

export const rootActions = {
	...userActions,
	...cartSlice.actions,
	...carouselSlice.actions,
	...filtersSlice.actions,
	...ProductActions,
	...productSlice.actions
}
