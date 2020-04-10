import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  // Message,
  Notification,
  Avatar,
  Drawer,
  Scrollbar
} from 'element-ui'

// Vue.use(Message, { size: 'small' })
Vue.use(Scrollbar, { size: 'small' })
Vue.use(Avatar, { size: 'small' })
Vue.use(Pagination, { size: 'small' })
Vue.use(Dialog, { size: 'small' })
Vue.use(Autocomplete, { size: 'small' })
Vue.use(Drawer, { size: 'small' })
Vue.use(Dropdown, { size: 'small' })
Vue.use(DropdownMenu, { size: 'small' })
Vue.use(DropdownItem, { size: 'small' })
Vue.use(Menu, { size: 'small' })
Vue.use(Submenu, { size: 'small' })
Vue.use(MenuItem, { size: 'small' })
Vue.use(MenuItemGroup, { size: 'small' })
Vue.use(Input, { size: 'small' })
Vue.use(InputNumber, { size: 'small' })
Vue.use(Radio, { size: 'small' })
Vue.use(RadioGroup, { size: 'small' })
Vue.use(RadioButton, { size: 'small' })
Vue.use(Checkbox, { size: 'small' })
Vue.use(CheckboxButton, { size: 'small' })
Vue.use(CheckboxGroup, { size: 'small' })
Vue.use(Switch, { size: 'small' })
Vue.use(Select, { size: 'small' })
Vue.use(Option, { size: 'small' })
Vue.use(OptionGroup, { size: 'small' })
Vue.use(Button, { size: 'small' })
Vue.use(ButtonGroup, { size: 'small' })
Vue.use(Table, { size: 'small' })
Vue.use(TableColumn, { size: 'small' })
Vue.use(DatePicker, { size: 'small' })
Vue.use(TimeSelect, { size: 'small' })
Vue.use(TimePicker, { size: 'small' })
Vue.use(Popover, { size: 'small' })
Vue.use(Tooltip, { size: 'small' })
Vue.use(Breadcrumb, { size: 'small' })
Vue.use(BreadcrumbItem, { size: 'small' })
Vue.use(Form, { size: 'small' })
Vue.use(FormItem, { size: 'small' })
Vue.use(Tabs, { size: 'small' })
Vue.use(TabPane, { size: 'small' })
Vue.use(Tag, { size: 'small' })
Vue.use(Tree, { size: 'small' })
Vue.use(Alert, { size: 'small' })
Vue.use(Slider, { size: 'small' })
Vue.use(Icon, { size: 'small' })
Vue.use(Row, { size: 'small' })
Vue.use(Col, { size: 'small' })
Vue.use(Upload, { size: 'small' })
Vue.use(Progress, { size: 'small' })
Vue.use(Spinner, { size: 'small' })
Vue.use(Badge, { size: 'small' })
Vue.use(Card, { size: 'small' })
Vue.use(Rate, { size: 'small' })
Vue.use(Steps, { size: 'small' })
Vue.use(Step, { size: 'small' })
Vue.use(Carousel, { size: 'small' })
Vue.use(CarouselItem, { size: 'small' })
Vue.use(Collapse, { size: 'small' })
Vue.use(CollapseItem, { size: 'small' })
Vue.use(Cascader, { size: 'small' })
Vue.use(ColorPicker, { size: 'small' })
Vue.use(Transfer, { size: 'small' })
Vue.use(Container, { size: 'small' })
Vue.use(Header, { size: 'small' })
Vue.use(Aside, { size: 'small' })
Vue.use(Main, { size: 'small' })
Vue.use(Footer, { size: 'small' })
Vue.use(Timeline, { size: 'small' })
Vue.use(TimelineItem, { size: 'small' })
Vue.use(Link, { size: 'small' })
Vue.use(Divider, { size: 'small' })
Vue.use(Image, { size: 'small' })
Vue.use(Calendar, { size: 'small' })
Vue.use(Backtop, { size: 'small' })
Vue.use(PageHeader, { size: 'small' })
Vue.use(CascaderPanel, { size: 'small' })

Vue.use(Loading.directive, { size: 'small' })

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

// import Element from 'element-ui'
// Vue.use(Element, { size: 'small' })
