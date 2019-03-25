import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { AllProductPage } from '../AllProductPage'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() })
import { FlatList } from 'react-native'


describe('<AllProductPage /> component', () => {

    const products = [{
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
    // const mockProductsfn = jest.fn()
 
    it('renders an FlatList', () => {
        const wrapper = shallow(<AllProductPage products={products} />)
        expect(wrapper.find(FlatList).length).toEqual(1)
      })

    it('renders correctly', () => {
        const wrapper = shallow(<AllProductPage products={products} />)
        expect(wrapper).toMatchSnapshot()
        })
})
