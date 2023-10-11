const scrollTop = (e) =>{
    // check ben main js (589)
    e?.preventDefault()
    $("html, body").animate(
        {
            scrollTop: 0
        },800
    )
}
export default scrollTop