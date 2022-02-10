import { Client as DeliveryClient, Op, Query } from "contensis-delivery-api"

const ContensisDeliveryClient = DeliveryClient.create({
  rootUrl:  process.env.PUBLIC_URL,
	accessToken: process.env.ACCESS_TOKEN,
	projectId: process.env.PROJECT,
});

export const getEntries = async (contentTypes:string[], fields:string[], pageSize = 9999) => {
  try {
    const query =  new Query(
      Op.equalTo('sys.contentTypeId', [...contentTypes]),
      Op.equalTo('sys.versionStatus', 'latest')
    );
    query.pageSize = pageSize;
    query.fields = [...fields]
    const payload = await ContensisDeliveryClient.entries.search(query);
    const { items } = payload || {};
    return items;
  } catch (e) {
    console.error(e)
  }
}

export const getEntryById = async (id:string, linkDepth = 1) => {
  try {
      if (id !== 'N/A') {
        return await ContensisDeliveryClient.entries.get({
          id,
          linkDepth,
        });
    }
  } catch (e) {
    console.error(e)
  }
}