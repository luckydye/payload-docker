const contentUrl =
  "https://api-eu-central-1.graphcms.com/v2/ckpyd6ueoo00f01z0eo4rgn07/master";

export function fetchApi(graphQuery) {
  return fetch(contentUrl, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjM4NzMyMjIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrcHlkNnVlb28wMGYwMXowZW80cmduMDcvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGZhMmRhYjYtZWQ3Yi00Y2UyLTk4NTYtNGIwMDkxYWRlMjEyIiwianRpIjoiY2twenc2dHhpZ2ZiMDAxeXpiaWg0Z3UwZCJ9.V4MEFWNKBdAanX0IAVv0MxfiiCvuSiObUn55PkLoWoInXIUBeUhx-tabm-5uC4vgEuUhG_Htmw7-cqYFFUafud2f__98cUICglb0ATbzNpkIs6bsKeOOwm_bWEuja8BRGfpUItnKmALcHDV65s2Z2I_4Bv7uRCJnQJsD92XWxuKV0hnCtFy168TLRcywc_M6RthWC1-OMVZ0LqNZvx2QVx-Grd1UX4ewgrBKz0OJNHJJCqKh47xutTPvN6AJ0ZyFPb3vzwO_jTm4GxnuE0EayMYVjTCaFRpt6RC6QjE8xntxMwWbsIZnWzQJ9-rjZYDtODKl-MufVp-Wu83ZDc75IY1IY_8dGercjgV6JH7jH-MBjKUtypK-m02C9Eyn5qBLtx57V5Iunj8EH98RQwHgCTHCVtN5MBSLA0C4hbgAq_OLe5k7Fmi7ciA3ORYjF-IKx6vD9zWyPoQ374zZFI8Bngm6Jxgt7PZF6FOmOpie7RRylhn11yT_HfAvxHQtQuQvZ9U38b-PERtmKl_5PIGpjXlgLBKAvllCduy9HECDQAqV90oZc8QPyX8th6exCgh7ZMdrXY2RIUsU7P1O-QVL8tdYpt9t094YOYPAVD_Wg_7_5Opyl5w1uu_IZTtxhWdyJYLDMt7b4mi5jL3o0S5mskUcdYp3JwK2e8NvGuwc-Tk",
    },
    body: JSON.stringify({
      query: graphQuery,
      variables: null,
    }),
  })
    .then(async (res) => res.json())
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
}
