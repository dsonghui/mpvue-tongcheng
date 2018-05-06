/**
 *
 * Author: david.deng<david.deng@jcinfotech.com>
 * Date: 2018/4/26
 */
// import { WxStorage } from "helpers/WxStorage";
// import { MChatService } from "api/services/MChatService";
//
// export class DictManager {
//
//
//   static getMChatItems() {
//     let items = WxStorage.get('getMChatItems');
//     if (items) return Promise.resolve(items);
//     return MChatService.getInstance<MChatService>().GetMChatItem().then(response => {
//       if (Array.isArray(response) && response.length > 0) {
//         WxStorage.set('getMChatItems', response);
//       }
//       return response;
//     })
//   }
//
//   static getAbcItems(){
//
//   }
//
// }
