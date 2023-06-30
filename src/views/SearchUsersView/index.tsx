/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Appbar,
  Searchbar,
  SegmentedButtons,
  TextInput,
  Text,
  Tooltip,
  IconButton,
  ProgressBar,
} from 'react-native-paper';
import ContactList from '../AddedUsersView/list/ContactList';
import ContactServices, { TSearchParams } from '../../lib/services/ContactServices';
import { useApiContext } from '../../lib/context/ApiContext';
import { TUser } from '../../lib/types/TSchema';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleWrapper: {},
  inputWrapper: {},
  contentContainer: {
    flex: 1, // pushes the footer to the end of the screen
    margin: 15,
  },
  footer: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 70,
    width: '100%',
  },
});

/**
 * TODO: Check the size of the screen to dynamically change the number of items to show
 * TODO: Load from cache for contacts?
 */
function SearchUsersView({ navigation }) {
  const { useFetch } = useApiContext();

  const [value, setValue] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  const [listType, setListType] = React.useState<'all' | 'blocked' | 'contacts'>('all');
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<TUser[] | null>(null);
  const _handleMore = () => console.log('Shown more');

  const _handleSearch = () => {
    setIsLoading(true);

    if (listType === 'blocked') return;

    const params: TSearchParams = {
      q: searchQuery,
      search_in: listType,
      limit: 6,
      offset: currentPage * 6,
    };
    ContactServices(useFetch)
      .searchUsers(params)
      .then((res) => {
        console.log(res);
        if (res && res.length > 0) {
          setData(res as TUser[]);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _handleBlocked = () => {
    console.log('Blocked');
    setIsLoading(true);
    // const params: TSearchParams = {
    //   q: searchQuery,
    //   search_in: contactOnly ? 'contacts' : 'all',
    //   limit: 6,
    //   offset: currentPage * 6,
    // };
    ContactServices(useFetch)
      .fetchBlockedList()
      .then((res) => {
        console.log(res);
        if (res !== undefined && res.length > 0) {
          setData(res as TUser[]);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (listType === 'all' || listType === 'contacts') _handleSearch();
    if (listType === 'blocked') _handleBlocked();
  }, [searchQuery, listType, currentPage]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={`Search ${listType}`} />
        <Tooltip title="Show Contacts">
          <IconButton
            icon="account"
            selected={listType === 'contacts'}
            size={24}
            onPress={() => setListType(listType === 'contacts' ? 'all' : 'contacts')}
          />
        </Tooltip>
        <Tooltip title="Show Blocked">
          <IconButton
            icon="account-cancel"
            selected={listType === 'blocked'}
            size={24}
            onPress={() => setListType(listType === 'blocked' ? 'all' : 'blocked')}
          />
        </Tooltip>
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <ProgressBar indeterminate visible={isLoading} />
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        mode="bar"
        style={{ margin: 10 }}
      />
      <View style={styles.contentContainer}>
        {/* <Text>{contactOnly ? 'Contacts' : 'All Users'}</Text> */}
        {/* {!!onError && <Text>{onError}</Text>} */}
        {(data?.length === 0 || data === null) && (
          <Text>
            No {searchQuery !== '' ? searchQuery : 'user'} in {listType}.
          </Text>
        )}
        {!!data && <ContactList contacts={data} listType={listType} />}
      </View>
      <View style={styles.footer}>
        <SegmentedButtons
          style={{ margin: 10, width: '50%' }}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'prev',
              label: 'Previous',
              onPress: () => setCurrentPage(currentPage - 1),
              disabled: currentPage === 0,
            },
            {
              value: 'next',
              label: 'Next',
              onPress: () => setCurrentPage(currentPage + 1),
              disabled: !data || data?.length <= 6,
            },
          ]}
        />
      </View>
    </View>
  );
}

export default SearchUsersView;
