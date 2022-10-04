export function setValidDataUser(state, flag = false) {
    let data = {};
    if (!flag) { data.id = Number(state.id) }
    data.first_name = String(state.first_name)
    data.second_name = state.second_name === null || state.second_name === '' ? null : String(state.second_name)
    data.phone_number = state.phone_number === null || state.phone_number === '' ? null : String(state.phone_number)
    data.tg_id = Number(state.tg_id)
    data.role_id = state.role_id === 'null' ? null : Number(state.role_id);
    return data
}

export function setValidDataRole(state, flag = false) {
    let data = {};
    if (!flag) { data.id = Number(state.id) }
    data.title = String(state.title)
    data.slug = String(state.slug)
    data.emoji = String(state.emoji)
    data.description = state.description === null || state.description === "" ? null : String(state.description)
    data.form = state.form === null || state.form === "" ? null : String(state.form)
    data.is_visible = Boolean(state.is_visible)
    return data
}

export function setValidDataItems(state, flag = false) {
    let data = {};
    if (!flag) { data.id = Number(state.id) }
    data.title = String(state.title)
    data.slug =  String(state.slug)
    data.price = Number(state.price)
    data.description = state.description === null || state.description === "" ? null : String(state.description)
    data.duration = Number(state.duration)
    data.can_buy_muliple_times = Boolean(state.can_buy_muliple_times)
    return data
}

export function setValidDataPaymentsHistory(state, flag = false, moment) {
    let data = {};
    if (!flag) { data.id = Number(state.id) }
    data.item_id = Number(state.item_id)
    data.user_id = Number(state.user_id)
    data.expiration_date = String(moment(moment(state.expiration_date).format('YYYY-MM-DD'))
        .set({hour: 0, minute: 0, second: 0, millisecond: 0}).format('YYYY-MM-DDTHH:mm:ss'))
    return data
}

export function setValidDataCategories(state, flag = false) {
    let data = {};
    if (!flag) { data.id = Number(state.id) }
    data.title = String(state.title)
    data.slug = String(state.slug)
    data.channel_tg_id = String(state.channel_tg_id)
    data.channel_url = String(state.channel_url)
    data.emoji = String(state.emoji)
    data.private_channel_tg_id = String(state.private_channel_tg_id)
    return data
}
