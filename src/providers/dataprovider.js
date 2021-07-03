import { fetchUtils } from 'react-admin';
import { url as apiUrl } from '../config/api';

const httpClient = fetchUtils.fetchJson;

export default {
  /**
   * @param resource
   * @param pagination
   * @param sort
   * @param filter
   * @returns {Promise<{total: number, data: *}>}
   */
  getList: async (resource, { pagination, sort, filter }) => {
    const { json = [] } = await httpClient(`${apiUrl}/${resource}.json`);
    return {
      data: json || [],
      total: json.length,
    };
  },

  /**
   * @param resource
   * @param params
   * @returns {Promise<{data: *}>}
   */
  getOne: async (resource, params) => {
    const { json = [] } = await httpClient(`${apiUrl}/${resource}.json`);
    const result = json.find((element) => element.id === params.id);

    return {
      data: result,
    };
  },

  getMany: async (resource, params) => {
    const promises = params.ids.map((item) =>
      httpClient(`${apiUrl}/${resource}/${item}`, {
        credentials: 'include',
      })
    );
    const records = (await Promise.all(promises).then((res) => res)).map(
      ({ json: data = {} }) => data
    );
    return {
      data: records,
    };
  },

  /**
   * @param resource
   * @param params
   * @returns {Promise<{data: *}>}
   */
  update: async (resource, params) => {
    const { id, ...body } = params.data;
    const { json } = await httpClient(`${apiUrl}/${resource}/${id}`, {
      method: 'POST',
      body: JSON.stringify(body),

      credentials: 'include',
    });
    return {
      data: json,
    };
  },

  /**
   * @param resource
   * @param params
   * @returns {Promise<{data: {id: *}}>}
   */
  create: async (resource, params) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),

      credentials: 'include',
    });
    return {
      data: json,
    };
  },

  /**
   *
   * @param resource
   * @param params
   * @returns {Promise<{data: *}>}
   */
  delete: async (resource, params) => {
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return {
      data: {},
    };
  },

  /**
   *
   * @param resource
   * @param params
   * @returns {Promise<{data: []}>}
   */
  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',

          credentials: 'include',
        })
      )
    );
    return {
      data: [],
    };
  },
};
