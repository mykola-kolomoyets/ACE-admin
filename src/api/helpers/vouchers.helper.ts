import {VoucherRequest} from '../../utils/types/voucher';

class VoucherHelper {
	getFormData(data: VoucherRequest): FormData {
		const formData = new FormData();
		
		const {email, holder, image, name, redeemableProducts} = data;
		
		image && formData.append('file', image);
		
		name && formData.append('name', name);
		holder && formData.append('holder', holder);
		email && formData.append('email', email);
		
		redeemableProducts?.length &&
		redeemableProducts.forEach((product, index) => {
			Object.entries(product).forEach(([key, value]) => {
				formData.append(
					`redeemableProducts[${index}][${key}]`,
					value.toString()
				);
			});
		});
		
		return formData;
	}
}

export default VoucherHelper;
