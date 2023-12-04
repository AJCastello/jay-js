export interface IFragment extends Partial<Omit<DocumentFragment, "children">> {
  children: string | Node | (string | Node)[];
}