import API from "@shared/api";

export const searchApi = {
  async search(q: string): Promise<{ id: string; name: string }[]> {
    const { data } = await API.get("/search", { params: { q } });
    return data;
  },
};
