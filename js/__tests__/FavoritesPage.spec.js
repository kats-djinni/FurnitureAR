import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { FavoritesPage } from '../FavoritesPage'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() })
import { FlatList } from 'react-native'


describe('<FavoritesPage /> component', () => {

    const faves = [{
                "name": "assets/3txPAhYeu-x",
                "displayName": "Chair",
                "authorName": "Ryan D",
                "objurl": "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/model.obj",
                "mtlurl": "https://poly.googleapis.com/downloads/fp/1551711596400293/3txPAhYeu-x/3DjXPukLzqV/materials.mtl",
                "formatType": "OBJ",
                "thumbnail": "https://lh3.googleusercontent.com/dlwexhUXTVDfcmJayQRruP6IqK35UG1hw5C8Wmv-5E7d-cAfVQf5ThJ1cmiayHc"
            }
        ]

    let wrapper
    let wrapperInstance

    beforeEach(() => {
       const wrapper = shallow(<FavoritesPage favorites={[]} />)
       //wrapperInstance = wrapper.instance() 

       wrapper.setState({ favorites: faves}, () => {
           wrapper.update();
           expect(wrapper.state('favorites')).toEqual(faves);
           //console.log(wrapper.debug());
       });

    })
 
    it('renders an FlatList on Favorites', () => {
        const wrapper = shallow(<FavoritesPage />)
        wrapper.setState({ favorites: faves}, () => {
           wrapper.update();
           expect(wrapper.find(FlatList).length).toEqual(1)
           //console.log(wrapper.debug());
       });
        
      })

    it('renders correctly', () => {
        const wrapper = shallow(<FavoritesPage />)
        expect(wrapper).toMatchSnapshot()
        })
})
