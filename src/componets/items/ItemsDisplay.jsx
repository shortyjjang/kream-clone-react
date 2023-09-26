import Banner from './Banner'
import ShortcutCollection from './ShortcutCollection'
import Product from './Product'
import StyleCollection from './StyleCollection'
import SocailPost from './SocailPost'
import SocailCard from './SocailCard'
import SocialUser from './SocialUser'

export default function ItemsDisplay({view_type, item, list_display_type = null}) {
    if(view_type === 'banner') {
        return <Banner banner={item} />
    }
    if(view_type === 'shortcut_collection') {
        return <ShortcutCollection collection={item} />
    }
    if(view_type === 'home_card_ranking' ||  view_type === 'home_card' || view_type === 'product' ) {
        return  <Product {...item} release={list_display_type === 'C' && item.product.release.date_released} view_type={view_type} ranking={view_type === 'home_card_ranking' || item.tag} />
    }
    if(view_type === 'style_collection') {
        return <StyleCollection {...item} />
    }
    if(view_type === 'social_post' && list_display_type === 'style_groups') return <SocailCard post={item.social_post} />
    if(view_type === 'social_post') return <SocailPost post={item.social_post} />
    if(view_type === 'social_user') return <SocialUser {...item.social_user} />
    return <></>
}
