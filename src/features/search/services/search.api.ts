import { http } from "../../../shared/api/http";
export const searchApi = {
  async search(q: string): Promise<{ id: string; name: string }[]> {
    const { data } = await http.get("/search", { params: { q } });
    return data;
  },
};
